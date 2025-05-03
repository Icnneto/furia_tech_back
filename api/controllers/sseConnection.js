import { fetchAllData } from "../../services/fetchAllData.js";

// Map <res, LastEventId>
const clients = new Map();
let eventIdCounter = 1;

const eventHistory = [];
const MAX_HISTORY = 100;

function formatSSEEvent(id, data, eventType = null){
    let event = `id: ${id}\n`;
    if (eventType) event += `event: ${eventType}\n`;
    event += `data: ${JSON.stringify(data)}\n\n`;
    return event;
};

function storeEvent(event) {
    eventHistory.push(event);
    if (eventHistory.length > MAX_HISTORY) {
        eventHistory.shift();
    }
};

export async function broadcastToClients(data) {

    const dataReceived = data;

    const id = eventIdCounter++;
    const message = formatSSEEvent(id, dataReceived);

    storeEvent({ id, message });

    clients.forEach((_, clientRes) => {
        try {
            clientRes.write(message);
        } catch (error) {
            console.error('Error sending data to a SSE client:', error);
            clients.delete(clientRes);
        }
    });
};

export async function main (req, res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const lastEventId = parseInt(req.headers['last-event-id'], 10);
    clients.set(res, lastEventId || null);

    if (!isNaN(lastEventId)){
        const missedEvents = eventHistory.filter(e => e.id > lastEventId);
        missedEvents.forEach(e => res.write(e.message));
    };

    res.write(`data: Connected to server\n\n`);

    try {
        const fetchedData = await fetchAllData();
        const initEvent = formatSSEEvent(eventIdCounter++, fetchedData);
        storeEvent({ id: eventIdCounter - 1, message: initEvent })
        res.write(initEvent);
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.write(formatSSEEvent(eventIdCounter++, { error: 'Error fetching data from MongoDB' }));
    };

    // When client closes connection, stop sending events
    req.on('close', () => {
        clients.delete(res);
        res.end();
    });
};