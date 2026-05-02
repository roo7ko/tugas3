import { StyleSheet, View, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

const GAP = 16;

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  diskon: boolean;
}

const products: Product[] = [
  { id: '1', name: 'Mechanical Keyboard', price: 'Rp 850.000', category: 'Peripherals', diskon: true },
  { id: '2', name: 'Gaming Mouse', price: 'Rp 450.000', category: 'Peripherals', diskon: false },
  { id: '3', name: 'Monitor 24"', price: 'Rp 2.100.000', category: 'Display', diskon: true },
  { id: '4', name: 'USB-C Hub', price: 'Rp 320.000', category: 'Accessories', diskon: false },
];

export default function App() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const cardWidth = (width - (GAP * 3)) / 2; // Calculation for 2 columns with gaps

  const renderHeader = () => (
    <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
      <ThemedText type="title" style={styles.headerTitle}>⚙️ TechGears Store</ThemedText>
      <ThemedText style={styles.headerSubtitle}>Katalog Produk Terbaik</ThemedText>
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ThemedView style={[styles.card, { width: cardWidth }]}>
      {/* Badge DISKON - Absolute Positioning */}
      {item.diskon && (
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>OFF</ThemedText>
        </View>
      )}

      {/* Gambar placeholder */}
      <View style={styles.imagePlaceholder}>
        <ThemedText style={styles.imageIcon}>🖥️</ThemedText>
      </View>

      {/* Info Produk */}
      <ThemedText style={styles.category}>{item.category}</ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.productName}>{item.name}</ThemedText>
      <ThemedText style={styles.price}>{item.price}</ThemedText>

      {/* Tombol Beli */}
      <TouchableOpacity 
        activeOpacity={0.7}
        accessibilityRole="button"
        style={styles.buyButton}
        onPress={() => console.log(`Buying ${item.name}`)}
      >
        <ThemedText style={styles.buyText}>Beli Sekarang</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },

  // HEADER
  listContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#1a1a2e', // Keeping brand color
    borderBottomWidth: 1,
    borderBottomColor: '#7c3aed',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: Fonts.rounded, // Using theme fonts
    color: '#ffffff',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#a78bfa',
    marginTop: 2,
    textAlign: 'center',
  },

  // GRID
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: GAP,
  },

  // CARD
  card: {
    backgroundColor: '#1e1e2e', // Keeping brand color
    borderRadius: 16,
    padding: 12,
    marginBottom: GAP,
    position: 'relative',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  // BADGE OFF - Absolute
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 10,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },

  // IMAGE PLACEHOLDER
  imagePlaceholder: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageIcon: {
    fontSize: 40,
  },

  // PRODUCT INFO
  category: {
    fontSize: 11,
    fontFamily: Fonts.mono,
    color: '#a78bfa',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: '#34d399',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // TOMBOL BELI
  buyButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buyText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});