$(document).ready(function () {
    const copy_btn_originalContent = "<em class=\"bi bi-clipboard-check \"></em> Copy to Clipboard";

    checkDeletedParam(); // Check on page load
    $("#push_payload").click(function () {
        revealPassword();
    });

    $('.btn_copy').click(function () {
        copyToClipboard();
        $('.btn_copy').each(function () {
            $(this).click(function () {
                copyToClipboard();
                $(this).html("Copied!");
                const element = $(this);  // Save the jQuery object
                setTimeout(function () {
                    element.html(copy_btn_originalContent);
                }, 1000);
            });
        });
    });

    $("#deleteLink").click(function () {
        $(this).html('Processing...')
        const url = $('#secret_delete_url').attr('data-url');
        $.ajax({
            url: url, type: 'DELETE', success: function () {
                window.location.href = updateQueryStringParameter(window.location.href, 'deleted', 'true');
            }, error: function (xhr, status, error) {
                window.location.href = updateQueryStringParameter(window.location.href, 'deleted', 'true');
            }
        });
    });
});
function updateQueryStringParameter(uri, key, value) {
    const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    const separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}
function revealPassword() {
    const payloadDiv = $('#push_payload');
    if (payloadDiv.length) {
        payloadDiv.css('transition', 'filter 250ms ease 0s');
        payloadDiv.css('filter', 'none');
    }
}
function checkDeletedParam() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('deleted') === 'true') {
        $('#delete_alert').show();
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
