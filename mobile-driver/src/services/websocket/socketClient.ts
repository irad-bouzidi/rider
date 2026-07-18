import { Client, IMessage } from '@stomp/stompjs';
import { API_BASE_URL } from '../../shared/constants/api';

type MessageHandler = (message: any) => void;

class SocketClient {
  private client: Client | null = null;
  private subscriptions: Map<string, MessageHandler[]> = new Map();
  private isConnected = false;

  connect(token: string) {
    if (this.client?.active) return;
    const wsUrl = API_BASE_URL.replace(/^http/, 'ws').replace('/api/v1', '/ws');
    this.client = new Client({
      brokerURL: wsUrl,
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => { this.isConnected = true; this.resubscribeAll(); },
      onDisconnect: () => { this.isConnected = false; },
      onStompError: (frame) => console.error('STOMP error:', frame.headers['message']),
    });
    this.client.activate();
  }

  disconnect() {
    this.subscriptions.clear();
    if (this.client) { this.client.deactivate(); this.client = null; }
    this.isConnected = false;
  }

  subscribe(destination: string, handler: MessageHandler): () => void {
    const existing = this.subscriptions.get(destination) || [];
    existing.push(handler);
    this.subscriptions.set(destination, existing);
    if (this.client?.active) {
      this.client.subscribe(destination, (message: IMessage) => {
        try { handler(JSON.parse(message.body)); } catch { handler(message.body); }
      });
    }
    return () => {
      const handlers = this.subscriptions.get(destination) || [];
      const filtered = handlers.filter((h) => h !== handler);
      filtered.length === 0 ? this.subscriptions.delete(destination) : this.subscriptions.set(destination, filtered);
    };
  }

  send(destination: string, body: any) {
    if (this.client?.active) {
      this.client.publish({ destination, body: typeof body === 'string' ? body : JSON.stringify(body) });
    }
  }

  private resubscribeAll() {
    if (!this.client?.active) return;
    this.subscriptions.forEach((handlers, destination) => {
      this.client!.subscribe(destination, (message: IMessage) => {
        try { const parsed = JSON.parse(message.body); handlers.forEach((h) => h(parsed)); }
        catch { handlers.forEach((h) => h(message.body)); }
      });
    });
  }

  get connectionStatus() { return this.isConnected; }
}

export const socketClient = new SocketClient();
