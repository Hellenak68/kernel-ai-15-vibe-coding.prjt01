import React, { useState } from 'react';
import { Plus, Search, Edit3, Trash2, Filter, Package } from 'lucide-react';
import { PantryItem } from '../types';

const Pantry: React.FC = () => {
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    {
      id: '1',
      name: '양파',
      amount: 3,
      unit: '개',
      category: 'vegetable',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7일 후
    },
    {
      id: '2',
      name: '닭가슴살',
      amount: 500,
      unit: 'g',
      category: 'meat',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2일 후
    },
    {
      id: '3',
      name: '우유',
      amount: 1,
      unit: 'L',
      category: 'dairy',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) // 5일 후
    },
    {
      id: '4',
      name: '현미',
      amount: 2,
      unit: '컵',
      category: 'grain'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

  const categories = [
    { value: 'all', label: '전체', color: 'bg-gray-100 text-gray-700' },
    { value: 'vegetable', label: '채소', color: 'bg-green-100 text-green-700' },
    { value: 'meat', label: '육류', color: 'bg-red-100 text-red-700' },
    { value: 'dairy', label: '유제품', color: 'bg-blue-100 text-blue-700' },
    { value: 'grain', label: '곡물', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'spice', label: '양념', color: 'bg-purple-100 text-purple-700' },
    { value: 'other', label: '기타', color: 'bg-gray-100 text-gray-700' }
  ];

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.value === category)?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    setIsAddingItem(true);
  };

  const handleEditItem = (item: PantryItem) => {
    setEditingItem(item);
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('정말로 이 재료를 삭제하시겠습니까?')) {
      setPantryItems(pantryItems.filter(item => item.id !== id));
    }
  };

  const getExpiryStatus = (expiryDate?: Date) => {
    if (!expiryDate) return { status: 'no-expiry', text: '유통기한 없음', color: 'text-gray-500' };
    
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return { status: 'expired', text: '만료됨', color: 'text-red-600' };
    if (daysUntilExpiry <= 2) return { status: 'expiring-soon', text: `${daysUntilExpiry}일 후 만료`, color: 'text-orange-600' };
    if (daysUntilExpiry <= 7) return { status: 'expiring-week', text: `${daysUntilExpiry}일 후 만료`, color: 'text-yellow-600' };
    return { status: 'good', text: `${daysUntilExpiry}일 후 만료`, color: 'text-green-600' };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">냉장고 관리</h1>
          <p className="text-gray-600">집에 있는 재료를 관리하고 레시피 추천을 받아보세요</p>
        </div>
        <button
          onClick={handleAddItem}
          className="btn btn-primary mt-4 md:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          재료 추가
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="재료 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-indigo-600 text-white'
                    : category.color + ' hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pantry Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const expiryStatus = getExpiryStatus(item.expiryDate);
          return (
            <div key={item.id} className="card hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="badge" className={`badge ${getCategoryColor(item.category)}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">수량:</span>
                  <span className="font-medium">{item.amount} {item.unit}</span>
                </div>
                
                {item.expiryDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">유통기한:</span>
                    <span className={`font-medium ${expiryStatus.color}`}>
                      {expiryStatus.text}
                    </span>
                  </div>
                )}
              </div>

              {/* Expiry Warning */}
              {expiryStatus.status === 'expired' && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 font-medium">⚠️ 유통기한이 지났습니다</p>
                </div>
              )}
              
              {expiryStatus.status === 'expiring-soon' && (
                <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-orange-700 font-medium">⚠️ 곧 유통기한이 만료됩니다</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">재료가 없습니다</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? '검색 조건에 맞는 재료가 없습니다.' 
              : '냉장고에 있는 재료를 추가해보세요.'}
          </p>
          <button
            onClick={handleAddItem}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            첫 번째 재료 추가하기
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-indigo-600 mb-2">
            {pantryItems.length}
          </div>
          <div className="text-gray-600">전체 재료</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {pantryItems.filter(item => {
              const status = getExpiryStatus(item.expiryDate);
              return status.status === 'good';
            }).length}
          </div>
          <div className="text-gray-600">신선한 재료</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            {pantryItems.filter(item => {
              const status = getExpiryStatus(item.expiryDate);
              return status.status === 'expiring-soon' || status.status === 'expiring-week';
            }).length}
          </div>
          <div className="text-gray-600">곧 만료</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-red-600 mb-2">
            {pantryItems.filter(item => {
              const status = getExpiryStatus(item.expiryDate);
              return status.status === 'expired';
            }).length}
          </div>
          <div className="text-gray-600">만료된 재료</div>
        </div>
      </div>
    </div>
  );
};

export default Pantry;
