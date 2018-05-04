function sendMessage (iframeId, message)
{
    var element = document.getElementById(iframeId);
    element.contentWindow.postMessage(message);
}