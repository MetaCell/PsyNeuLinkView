export default function messageHandler(data, handlers) {
    const { type, payload } = data;
    const handler = handlers[type];
    if (handler) {
        handler(payload);
    } else {
        console.log(`No handler for message type ${type}`);
    }
}
