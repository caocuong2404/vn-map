import { AppConfig } from '@/lib/AppConfig'
import { tileProviders } from '@/lib/TileProviders'
import { Layers } from 'lucide-react'
import { useCallback, useState } from 'react'

interface TileSwitcherProps {
  currentProvider: string
  onProviderChange: (provider: string) => void
}

export const TileSwitcher = ({ currentProvider, onProviderChange }: TileSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleProviderSelect = useCallback(
    (provider: string) => {
      onProviderChange(provider)
      setIsOpen(false)
    },
    [onProviderChange],
  )

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="relative">
      <button
        type="button"
        style={{ zIndex: 400 }}
        className="button absolute top-2 right-28 rounded p-2 shadow-md"
        onClick={toggleDropdown}
        aria-label="Switch tile layer"
      >
        <Layers size={AppConfig.ui.mapIconSize} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 300 }}
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dropdown menu */}
          <div
            className="absolute top-2 right-28 mt-12 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            style={{ zIndex: 500 }}
          >
            <div className="py-1" role="menu">
              {Object.entries(tileProviders).map(([key, provider]) => (
                <button
                  key={key}
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                    currentProvider === key ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                  onClick={() => handleProviderSelect(key)}
                  role="menuitem"
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
