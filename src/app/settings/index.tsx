import { Dropdown } from '@/components/ui/dropdown';
import { TopNav } from '@/components/ui/top-nav';
import type { Language, VideoQuality } from '@/store/settings.store';
import { useSettingsStore } from '@/store/settings.store';
import { THEME_PALETTES, useThemePaletteStore } from '@/store/theme-palette.store';
import { useAppTheme } from '@/context/theme-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages: { value: Language; label: string }[] = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'French', label: 'French' },
  { value: 'German', label: 'German' },
  { value: 'Japanese', label: 'Japanese' },
];

const qualities: { value: VideoQuality; label: string }[] = [
  { value: '480p', label: '480p' },
  { value: '720p', label: '720p' },
  { value: '1080p', label: '1080p' },
  { value: '4k', label: '4K' },
];

const legalLinks = [
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'terms', label: 'Terms of Service' },
  { slug: 'support', label: 'Help & Support' },
  { slug: 'about', label: 'About RallyIQ' },
];

function Row({ children }: { children: React.ReactNode }) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        gap: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        padding: 16,
      }}
    >
      {children}
    </View>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  const theme = useAppTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: theme.border,
        backgroundColor: theme.card,
        padding: 16,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: theme.primary }} />
    </View>
  );
}

export default function SettingsScreen() {
  const settings = useSettingsStore();
  const { activeThemeId, setTheme } = useThemePaletteStore();
  const theme = useAppTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }} edges={['top']}>
      <TopNav title="Settings" />
      <ScrollView contentContainerStyle={{ gap: 24, paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 }}>

        {/* ── App Theme Customization ──────────────────────────── */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: theme.textSecondary, letterSpacing: 0.5 }}>
            App Theme
          </Text>
          <View
            style={{
              borderRadius: 20,
              backgroundColor: theme.card,
              padding: 16,
              gap: 14,
              borderWidth: 1,
              borderColor: theme.border,
              shadowColor: theme.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '700', color: theme.text }}>
              Choose your colour palette
            </Text>

            {/* Theme swatches row */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {THEME_PALETTES.map((palette) => {
                const isActive = palette.id === activeThemeId;
                return (
                  <Pressable
                    key={palette.id}
                    onPress={() => setTheme(palette.id)}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      gap: 8,
                      borderRadius: 16,
                      padding: 12,
                      borderWidth: isActive ? 2 : 1,
                      borderColor: isActive ? palette.primary : theme.border,
                      backgroundColor: isActive ? palette.background : theme.surfaceSecondary,
                      shadowColor: palette.primary,
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: isActive ? 0.2 : 0,
                      shadowRadius: 6,
                      elevation: isActive ? 3 : 0,
                    }}
                  >
                    {/* Colour swatch circle */}
                    <View
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 19,
                        backgroundColor: palette.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 3,
                        borderColor: palette.background,
                        shadowColor: palette.primary,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 2,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>{palette.emoji}</Text>
                    </View>

                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: isActive ? '800' : '600',
                        color: isActive ? palette.primary : theme.textSecondary,
                      }}
                    >
                      {palette.name}
                    </Text>

                    {isActive && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: palette.primary,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Feather name="check" size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>

            {/* Active palette colour strip preview */}
            {(() => {
              const t = THEME_PALETTES.find((p) => p.id === activeThemeId)!;
              return (
                <View style={{ flexDirection: 'row', gap: 4, marginTop: 2 }}>
                  <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.primary }} />
                  <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.accent }} />
                  <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.accentDark }} />
                  <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: t.background }} />
                </View>
              );
            })()}

            <Text style={{ fontSize: 11, color: theme.textMuted, fontStyle: 'italic', textAlign: 'center' }}>
              Theme will be applied across the entire app
            </Text>
          </View>
        </View>

        {/* ── Notifications ────────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: theme.textSecondary, letterSpacing: 0.5 }}>
            Notifications
          </Text>
          <ToggleRow
            label="Push Notifications"
            value={settings.notificationsEnabled}
            onChange={settings.setNotificationsEnabled}
          />
        </View>

        {/* ── General ──────────────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: theme.textSecondary, letterSpacing: 0.5 }}>
            General
          </Text>
          <Row>
            <Dropdown label="Language" value={settings.language} options={languages} onChange={settings.setLanguage} />
          </Row>
        </View>

        {/* ── Video ────────────────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: theme.textSecondary, letterSpacing: 0.5 }}>
            Video
          </Text>
          <Row>
            <Dropdown
              label="Streaming Quality"
              value={settings.videoQuality}
              options={qualities}
              onChange={settings.setVideoQuality}
            />
          </Row>
          <Row>
            <Dropdown
              label="Download Quality"
              value={settings.downloadQuality}
              options={qualities}
              onChange={settings.setDownloadQuality}
            />
          </Row>
          <ToggleRow
            label="Auto-Download New Matches"
            value={settings.autoDownload}
            onChange={settings.setAutoDownload}
          />
          <ToggleRow label="Data Saver Mode" value={settings.dataSaver} onChange={settings.setDataSaver} />
        </View>

        {/* ── Legal & Support ──────────────────────────────────── */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', textTransform: 'uppercase', color: theme.textSecondary, letterSpacing: 0.5 }}>
            Legal & Support
          </Text>
          {legalLinks.map((link) => (
            <Pressable
              key={link.slug}
              onPress={() => router.push(`/settings/legal/${link.slug}`)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: theme.border,
                backgroundColor: theme.card,
                padding: 16,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '500', color: theme.text }}>{link.label}</Text>
              <Feather name="chevron-right" size={18} color={theme.textMuted} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
