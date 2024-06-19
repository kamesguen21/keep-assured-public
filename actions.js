$(document).ready(function () {
    $("#push_payload").click(function () {
        revealPassword();
    });

    $('.btn_copy').click(function () {
        copyToClipboard();
        $('.btn_copy').each(function () {
            $(this).click(function () {
                copyToClipboard();
                const originalContent = $(this).html();
                $(this).html("Copied!");
                const element = $(this);  // Save the jQuery object
                setTimeout(function () {
                    element.html(originalContent);
                }, 1000);
            });
        });
    });

    $("#deleteLink").click(function () {
        $(this).html('Processing...')
        const url = $('#secret_delete_url').attr('data-url');
        $.ajax({
            url: url, type: 'DELETE', success: function () {
                location.reload();
            }, error: function (xhr, status, error) {
                location.reload();
            }
        });
    });
});

function revealPassword() {
    const payloadDiv = $('#push_payload');
    if (payloadDiv.length) {
        payloadDiv.css('transition', 'filter 250ms ease 0s');
        payloadDiv.css('filter', 'none');
    }
}

function copyToClipboard() {
    const payloadDiv = $('#pass')[0];
    const range = document.createRange();
    range.selectNode(payloadDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        const successful = document.execCommand('copy');
        console.log('Copying text command was ' + (successful ? 'successful' : 'unsuccessful'));
    } catch (err) {
        console.error('Unable to copy', err);
    }

    window.getSelection().removeAllRanges();
}