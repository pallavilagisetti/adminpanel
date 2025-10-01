export type TicketStatus = 'open' | 'pending' | 'resolved'

export type Ticket = {
  id: string
  subject: string
  requesterEmail: string
  status: TicketStatus
  createdAt: number
}

const tickets: Ticket[] = [
  { id: 'tk1', subject: 'Unable to upload resume', requesterEmail: 'ava@example.com', status: 'open', createdAt: Date.now() - 3600_000 },
  { id: 'tk2', subject: 'Login issue', requesterEmail: 'noah@example.com', status: 'pending', createdAt: Date.now() - 7200_000 },
]

export function listTickets(): Ticket[] { return tickets }
export function createTicket(subject: string, requesterEmail: string): Ticket {
  const t: Ticket = { id: `tk_${Math.random().toString(36).slice(2,8)}`, subject, requesterEmail, status: 'open', createdAt: Date.now() }
  tickets.unshift(t); return t
}
export function setTicketStatus(id: string, status: TicketStatus): Ticket | null {
  const t = tickets.find(x => x.id === id); if (!t) return null; t.status = status; return t
}
export function deleteTicket(id: string): boolean {
  const i = tickets.findIndex(x => x.id === id); if (i === -1) return false; tickets.splice(i,1); return true
}



