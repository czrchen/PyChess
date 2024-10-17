function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const randomCode = getQueryParameter('code');
if (randomCode) {
    document.getElementById('generatedCode').innerText = `${randomCode}`;
} else {
    document.getElementById('generatedCode').innerText = 'No code generated.';
}