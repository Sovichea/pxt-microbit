export async function onRequest(context) {
    const url = new URL(context.request.url);
    const target = new URL(url.pathname + url.search, "https://makecode.com");
    const headers = new Headers(context.request.headers);
    headers.delete("host");

    const init = {
        method: context.request.method,
        headers,
        redirect: "follow",
    };
    if (context.request.method !== "GET" && context.request.method !== "HEAD") {
        init.body = context.request.body;
    }

    const response = await fetch(target, init);
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("transfer-encoding");

    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders,
    });
}
