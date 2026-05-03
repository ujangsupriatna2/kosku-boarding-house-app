'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { type ChatMessage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, MessageCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatView() {
  const {
    user,
    chatTargetUserId,
    chatTargetUserName,
    chatKosId,
    goBack,
  } = useAppStore();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (user && chatTargetUserId) {
      fetchMessages();
      pollIntervalRef.current = setInterval(fetchMessages, 3000);
    }
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [user, chatTargetUserId, chatKosId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if (!user || !chatTargetUserId) return;
    try {
      const params = new URLSearchParams({
        userId: user.id,
        otherUserId: chatTargetUserId,
      });
      if (chatKosId) params.set('kosId', chatKosId);
      const res = await fetch(`/api/chat?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : data.messages || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!user || !chatTargetUserId || !newMessage.trim()) return;
    setSending(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: chatTargetUserId,
          kosId: chatKosId || null,
          message: newMessage.trim(),
        }),
      });
      if (res.ok) {
        setNewMessage('');
        fetchMessages();
      } else {
        const err = await res.json();
        toast.error(err.error || 'Gagal mengirim pesan');
      }
    } catch {
      toast.error('Terjadi kesalahan');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <MessageCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h2 className="text-lg font-medium text-muted-foreground">Silakan Login</h2>
        <p className="text-sm text-muted-foreground mt-1">Masuk untuk mengirim pesan.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" size="icon" onClick={goBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {chatTargetUserName?.charAt(0).toUpperCase() || '?'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{chatTargetUserName || 'Chat'}</h2>
            {chatKosId && (
              <p className="text-xs text-muted-foreground">Terkait kos</p>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={fetchMessages} title="Refresh">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <Card className="border-0 shadow-sm mb-4">
        <div className="h-[calc(100vh-320px)] min-h-[400px] max-h-[600px] overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-3/4 rounded-xl" />
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Belum ada pesan. Mulai percakapan!</p>
              </div>
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = msg.senderId === user.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-muted rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                    <p
                      className={`text-[10px] mt-1 ${
                        isMe ? 'text-emerald-200' : 'text-muted-foreground'
                      }`}
                    >
                      {new Date(msg.createdAt).toLocaleTimeString('id-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input */}
      <div className="flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ketik pesan..."
          disabled={sending || !chatTargetUserId}
          className="flex-1 rounded-xl"
        />
        <Button
          onClick={handleSend}
          disabled={sending || !newMessage.trim() || !chatTargetUserId}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
