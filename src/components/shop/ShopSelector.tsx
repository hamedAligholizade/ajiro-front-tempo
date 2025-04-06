import React, { useEffect, useState } from 'react';
import { Store, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { cn } from '@/lib/utils';
import { t } from '@/lib/i18n';
import apiClient from '@/api/client/axios';
import { getCurrentShopId, setCurrentShopId } from '@/utils/shopContext';

interface Shop {
  id: string;
  name: string;
  description?: string;
}

const ShopSelector = () => {
  const [open, setOpen] = useState(false);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentShop, setCurrentShop] = useState<Shop | null>(null);

  // Fetch shops on component mount
  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/shop/all');
        const shopsList = response.data.data.shops;
        setShops(shopsList);
        
        // Set current shop
        const currentShopId = getCurrentShopId();
        if (currentShopId) {
          const shop = shopsList.find((s: Shop) => s.id === currentShopId);
          if (shop) {
            setCurrentShop(shop);
          } else if (shopsList.length > 0) {
            setCurrentShop(shopsList[0]);
            setCurrentShopId(shopsList[0].id);
          }
        } else if (shopsList.length > 0) {
          setCurrentShop(shopsList[0]);
          setCurrentShopId(shopsList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleShopSelect = (shop: Shop) => {
    setCurrentShop(shop);
    setCurrentShopId(shop.id);
    setOpen(false);
    
    // Reload the page to apply the new shop context
    window.location.reload();
  };

  if (shops.length <= 1) {
    return (
      <div className="flex items-center gap-2 text-primary">
        <Store className="h-4 w-4" />
        <span className="text-sm font-medium">
          {currentShop?.name || t('common.noShops')}
        </span>
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="truncate max-w-[150px]">
              {currentShop?.name || t('common.selectShop')}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('common.searchShops')} />
          <CommandEmpty>{t('common.noShopsFound')}</CommandEmpty>
          <CommandGroup>
            {shops.map((shop) => (
              <CommandItem
                key={shop.id}
                value={shop.id}
                onSelect={() => handleShopSelect(shop)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentShop?.id === shop.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="truncate">{shop.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ShopSelector; 