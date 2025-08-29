import React, { useState } from 'react';
import { Plus, CheckCircle, Circle, Trash2, ShoppingCart, Package, DollarSign, Filter } from 'lucide-react';
import { ShoppingItem } from '../types';

const ShoppingList: React.FC = () => {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([
    {
      id: '1',
      name: '닭가슴살',
      amount: 500,
      unit: 'g',
      category: 'meat',
      isChecked: false,
      estimatedPrice: 8000
    },
    {
      id: '2',
      name: '양상추',
      amount: 1,
      unit: '개',
      category: 'vegetable',
      isChecked: false,
      estimatedPrice: 3000
    },
    {
      id: '3',
      name: '토마토',
      amount: 4,
      unit: '개',
      category: 'vegetable',
      isChecked: false,
      estimatedPrice: 2000
    },
    {
      id: '4',
      name: '올리브오일',
      amount: 1,
      unit: '병',
      category: 'other',
      isChecked: true,
      estimatedPrice: 15000
    },
    {
      id: '5',
      name: '현미',
      amount: 2,
      unit: '컵',
      category: 'grain',
      isChecked: false,
      estimatedPrice: 5000
    },
    {
      id: '6',
      name: '우유',
      amount: 1,
      unit: 'L',
      category: 'dairy',
      isChecked: false,
      estimatedPrice: 4000
    }
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemUnit, setNewItemUnit] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<string>('vegetable');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const categories = [
    { value: 'all', label: '전체', color: 'bg-gray-100 text-gray-700' },
    { value: 'vegetable', label: '채소', color: 'bg-green-100 text-green-700' },
    { value: 'meat', label: '육류', color: 'bg-red-100 text-red-700' },
    { value: 'dairy', label: '유제품', color: 'bg-blue-100 text-blue-700' },
    { value: 'grain', label: '곡물', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'spice', label: '양념', color: 'bg-purple-100 text-purple-700' },
    { value: 'other', label: '기타', color: 'bg-gray-100 text-gray-700' }
  ];

  const units = ['개', 'g', 'kg', 'L', 'ml', '컵', '큰술', '작은술', '봉', '팩'];

  const getCategoryLabel = (category: string) => {
    return categories.find(cat => cat.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    return categories.find(cat => cat.value === category)?.color || 'bg-gray-100 text-gray-700';
  };

  const filteredItems = shoppingItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCompletion = showCompleted || !item.isChecked;
    return matchesCategory && matchesCompletion;
  });

  const checkedItems = shoppingItems.filter(item => item.isChecked);
  const uncheckedItems = shoppingItems.filter(item => !item.isChecked);
  const totalEstimatedPrice = shoppingItems.reduce((sum, item) => sum + (item.estimatedPrice || 0), 0);

  const handleToggleItem = (id: string) => {
    setShoppingItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      setShoppingItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemAmount.trim() || !newItemUnit.trim()) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      amount: parseFloat(newItemAmount),
      unit: newItemUnit,
      category: newItemCategory,
      isChecked: false
    };

    setShoppingItems(prev => [...prev, newItem]);
    setNewItemName('');
    setNewItemAmount('');
    setNewItemUnit('');
    setNewItemCategory('vegetable');
  };

  const handleClearCompleted = () => {
    if (window.confirm('완료된 항목들을 모두 삭제하시겠습니까?')) {
      setShoppingItems(prev => prev.filter(item => !item.isChecked));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">장보기 리스트</h1>
          <p className="text-gray-600">주간 레시피에 필요한 재료를 체크하고 쇼핑해보세요</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={handleClearCompleted}
            className="btn btn-outline"
            disabled={checkedItems.length === 0}
          >
            완료된 항목 삭제
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-indigo-600 mb-2">
            {shoppingItems.length}
          </div>
          <div className="text-gray-600">전체 항목</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {checkedItems.length}
          </div>
          <div className="text-gray-600">완료된 항목</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-orange-600 mb-2">
            {uncheckedItems.length}
          </div>
          <div className="text-gray-600">남은 항목</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {totalEstimatedPrice.toLocaleString()}원
          </div>
          <div className="text-gray-600">예상 총액</div>
        </div>
      </div>

      {/* Add New Item */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">새 항목 추가</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="재료 이름"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="수량"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="input"
          />
          <select
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
            className="input"
          >
            <option value="">단위 선택</option>
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="input"
          >
            {categories.slice(1).map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddItem}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            추가
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">카테고리:</span>
          </div>
          
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

          <div className="flex items-center space-x-2 ml-auto">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300"
            />
            <label htmlFor="showCompleted" className="text-sm text-gray-700">
              완료된 항목 표시
            </label>
          </div>
        </div>
      </div>

      {/* Shopping List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`card transition-all ${
              item.isChecked 
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'hover:scale-105'
            }`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleToggleItem(item.id)}
                className="flex-shrink-0"
              >
                {item.isChecked ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 hover:text-green-600" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h3 className={`text-lg font-medium ${
                    item.isChecked ? 'text-green-700 line-through' : 'text-gray-900'
                  }`}>
                    {item.name}
                  </h3>
                  <span className="badge" className={`badge ${getCategoryColor(item.category)}`}>
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>
                    {item.amount} {item.unit}
                  </span>
                  {item.estimatedPrice && (
                    <span className="flex items-center space-x-1">
                      <DollarSign className="w-4 h-4" />
                      <span>{item.estimatedPrice.toLocaleString()}원</span>
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDeleteItem(item.id)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">장보기 항목이 없습니다</h3>
          <p className="text-gray-600 mb-4">
            {selectedCategory !== 'all' 
              ? '선택한 카테고리에 항목이 없습니다.' 
              : '새로운 장보기 항목을 추가해보세요.'}
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="btn btn-primary"
          >
            전체 항목 보기
          </button>
        </div>
      )}

      {/* Progress Bar */}
      {shoppingItems.length > 0 && (
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">진행률</h3>
            <span className="text-sm text-gray-600">
              {checkedItems.length} / {shoppingItems.length} 완료
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(checkedItems.length / shoppingItems.length) * 100}%` }}
            ></div>
          </div>
          
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {shoppingItems.length > 0 
                ? `${Math.round((checkedItems.length / shoppingItems.length) * 100)}% 완료`
                : '0% 완료'
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
