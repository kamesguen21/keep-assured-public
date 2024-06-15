document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("push_payload").addEventListener("click", function () {
        revealPassword();
    });
    document.querySelectorAll('.btn_copy').forEach(element => {
        element.addEventListener('click', () => {
            copyToClipboard();
        });
    });
});

function revealPassword() {
    const payloadDiv = document.getElementById('push_payload');
    if (payloadDiv) {
        payloadDiv.style.transition = 'filter 250ms ease 0s';
        payloadDiv.style.filter = 'none';
    }
}

function copyToClipboard() {
    const payloadDiv = document.getElementById('pass');
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