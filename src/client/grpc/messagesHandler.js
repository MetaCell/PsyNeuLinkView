export default function messageHandler(data, handlers) {
    const { type, payload } = data;
    const handler = handlers[type];
    if (handler) {
        handler(payload);
    }
}
