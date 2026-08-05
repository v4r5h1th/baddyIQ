import { BarChart } from '@/components/charts';
import { suggestedQuestions } from '@/data/mock/coach';
import { useCoachStore } from '@/store/coach.store';
import type { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function MessageBubble({ message, onFollowUp }: { message: ChatMessage; onFollowUp: (q: string) => void }) {
  const isUser = message.role === 'user';
  return (
    <View className={cn('gap-2', isUser ? 'items-end' : 'items-start')}>
      <View className={cn('max-w-[85%] gap-2 rounded-3xl px-4 py-3', isUser ? 'bg-primary-500' : 'bg-bg-card border border-border')}>
        <Text className={cn('text-sm leading-5', isUser ? 'text-white' : 'text-text')}>{message.text}</Text>
        {message.chart ? (
          <View className="items-center pt-1">
            <BarChart data={message.chart.values.map((v) => ({ label: v.name, value: v.value }))} width={220} height={130} />
          </View>
        ) : null}
        {message.matchRef ? (
          <Pressable
            onPress={() => router.push(`/matches/${message.matchRef!.matchId}/summary`)}
            className="mt-1 flex-row items-center gap-2 rounded-2xl bg-bg-input p-2"
          >
            <Image source={{ uri: message.matchRef.thumbnailUrl }} className="h-10 w-10 rounded-lg" />
            <Text className="text-xs text-text-secondary">vs {message.matchRef.opponentName}</Text>
          </Pressable>
        ) : null}
      </View>
      {message.suggestedFollowUps?.length ? (
        <View className="flex-row flex-wrap gap-2">
          {message.suggestedFollowUps.map((q) => (
            <Pressable key={q} onPress={() => onFollowUp(q)} className="rounded-full border border-border px-3 py-1.5">
              <Text className="text-xs text-text-secondary">{q}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default function CoachChatScreen() {
  const { messages, isTyping, sendMessage } = useCoachStore();
  const [input, setInput] = useState('');
  const listRef = useRef<FlatList>(null);

  function handleSend(text: string) {
    if (!text.trim()) return;
    sendMessage(text);
    setInput('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <SafeAreaView className="flex-1 bg-bg" edges={['top']}>
      <View className="flex-row items-center gap-2 px-5 pb-2 pt-1">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-900">
          <Feather name="message-circle" size={18} color="#8FADFF" />
        </View>
        <Text className="text-lg font-bold text-text">AI Coach</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          contentContainerClassName="gap-4 px-5 pb-4"
          renderItem={({ item }) => <MessageBubble message={item} onFollowUp={handleSend} />}
          ListFooterComponent={
            isTyping ? <Text className="text-xs text-text-secondary">Coach is typing…</Text> : null
          }
        />
        {messages.length <= 1 ? (
          <View className="flex-row flex-wrap gap-2 px-5 pb-2">
            {suggestedQuestions.map((q) => (
              <Pressable key={q} onPress={() => handleSend(q)} className="rounded-full border border-border px-3 py-1.5">
                <Text className="text-xs text-text-secondary">{q}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
        <View className="flex-row items-center gap-2 border-t border-border px-4 py-3">
          <View className="flex-1 rounded-2xl border border-border bg-bg-input px-4 py-1">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask your coach anything…"
              placeholderTextColor="#6B7385"
              className="text-sm text-text"
              onSubmitEditing={() => handleSend(input)}
              returnKeyType="send"
            />
          </View>
          <Pressable onPress={() => handleSend(input)} className="h-11 w-11 items-center justify-center rounded-full bg-primary-500">
            <Feather name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
