import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { demoProductPath } from './lib/sitePaths'
import ScrollToTop from './components/ScrollToTop'
import { DataProvider } from './context/DataProvider'
import { DialogProvider } from './context/dialog-context'
import DashboardPage from './pages/DashboardPage'
import OrdersListPage from './pages/OrdersListPage'
import OrderEditPage from './pages/OrderEditPage'
import ProductsListPage from './pages/ProductsListPage'
import ProductEditPage from './pages/ProductEditPage'
import OfferDiscoveryPage from './pages/OfferDiscoveryPage'
import HomePage from './pages/storefront/HomePage'
import ShopPage from './pages/storefront/ShopPage'
import ProductDetailPage from './pages/storefront/ProductDetailPage'

function ProductEditRoute() {
  const { id } = useParams()
  return <ProductEditPage key={id} />
}

function OrderEditRoute() {
  const { id } = useParams()
  return <OrderEditPage key={id} />
}

/** Стари отметки към /products/... → /demo-site/products/... */
function LegacyProductRedirect() {
  const { id } = useParams()
  if (!id) return <Navigate to="/demo-site/products" replace />
  return <Navigate to={`${demoProductPath(id)}`} replace />
}

export default function App() {
  return (
    <DataProvider>
      <DialogProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<OfferDiscoveryPage />} />
            <Route path="/demo-site" element={<HomePage />} />
            <Route path="/demo-site/products" element={<ShopPage />} />
            <Route path="/demo-site/products/:id" element={<ProductDetailPage />} />
            <Route path="/products" element={<Navigate to="/demo-site/products" replace />} />
            <Route path="/products/:id" element={<LegacyProductRedirect />} />

            <Route path="/admin" element={<DashboardPage />} />
            <Route path="/admin/products" element={<ProductsListPage />} />
            <Route path="/admin/products/:id" element={<ProductEditRoute />} />
            <Route path="/admin/orders" element={<OrdersListPage />} />
            <Route path="/admin/orders/:id" element={<OrderEditRoute />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DialogProvider>
    </DataProvider>
  )
}
