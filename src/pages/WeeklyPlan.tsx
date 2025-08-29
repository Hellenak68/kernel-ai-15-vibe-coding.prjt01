import React, { useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, ChefHat, Clock, Plus, Edit3, Trash2 } from 'lucide-react';
import { Recipe, DailyPlan } from '../types';

const WeeklyPlan: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddingRecipe, setIsAddingRecipe] = useState(false);

  // 샘플 데이터
  const sampleRecipes: Recipe[] = [
    {
      id: '1',
      name: '닭가슴살 샐러드',
      description: '신선한 채소와 단백질이 풍부한 닭가슴살 샐러드',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      prepTime: 15,
      cookTime: 10,
      servings: 1,
      difficulty: 'easy',
      tags: ['샐러드', '단백질', '다이어트'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 250, protein: 30, carbs: 15, fat: 8, fiber: 5, sugar: 3, sodium: 400 },
      isFavorite: false
    },
    {
      id: '2',
      name: '오트밀 아침식사',
      description: '건강한 오트밀과 과일로 만드는 아침식사',
      image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=400',
      prepTime: 5,
      cookTime: 5,
      servings: 1,
      difficulty: 'easy',
      tags: ['아침식사', '오트밀', '건강식'],
      ingredients: [],
      instructions: [],
      nutrition: { calories: 180, protein: 6, carbs: 30, fat: 3, fiber: 4, sugar: 12, sodium: 50 },
      isFavorite: true
    }
  ];

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const getMealType = (hour: number) => {
    if (hour >= 6 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 15) return 'lunch';
    if (hour >= 17 && hour < 21) return 'dinner';
    return 'snack';
  };

  const getMealName = (mealType: string) => {
    switch (mealType) {
      case 'breakfast': return '아침';
      case 'lunch': return '점심';
      case 'dinner': return '저녁';
      case 'snack': return '간식';
      default: return '';
    }
  };

  const handleAddRecipe = (date: Date, mealType: string) => {
    setSelectedDate(date);
    setIsAddingRecipe(true);
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const handleNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">주간 레시피 계획</h1>
          <p className="text-gray-600">이번 주 식단을 계획하고 관리해보세요</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={handlePreviousWeek}
            className="btn btn-outline"
          >
            이전 주
          </button>
          <button
            onClick={handleNextWeek}
            className="btn btn-outline"
          >
            다음 주
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex items-center justify-center space-x-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <span className="text-lg font-semibold text-gray-900">
            {format(currentWeek, 'yyyy년 M월 d일', { locale: ko })} ~ {format(addDays(currentWeek, 6), 'M월 d일', { locale: ko })}
          </span>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        {weekDays.map((date, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Date Header */}
            <div className={`p-3 text-center ${
              format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                ? 'bg-indigo-100 border-b border-indigo-200'
                : 'bg-gray-50 border-b border-gray-200'
            }`}>
              <div className="text-sm text-gray-500">
                {format(date, 'EEE', { locale: ko })}
              </div>
              <div className={`text-lg font-semibold ${
                format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                  ? 'text-indigo-600'
                  : 'text-gray-900'
              }`}>
                {format(date, 'd')}
              </div>
            </div>

            {/* Meals */}
            <div className="p-3 space-y-3">
              {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {getMealName(mealType)}
                    </span>
                    <button
                      onClick={() => handleAddRecipe(date, mealType)}
                      className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Sample Recipe Display */}
                  {mealType === 'breakfast' && index === 1 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={sampleRecipes[1].image}
                          alt={sampleRecipes[1].name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {sampleRecipes[1].name}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {sampleRecipes[1].prepTime + sampleRecipes[1].cookTime}분
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {mealType === 'lunch' && index === 2 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={sampleRecipes[0].image}
                          alt={sampleRecipes[0].name}
                          className="w-8 h-8 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-900 truncate">
                            {sampleRecipes[0].name}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {sampleRecipes[0].prepTime + sampleRecipes[0].cookTime}분
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
          <ChefHat className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">레시피 추가</h3>
          <p className="text-gray-600">새로운 레시피를 주간 계획에 추가하세요</p>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
          <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">장보기 리스트</h3>
          <p className="text-gray-600">주간 레시피에 필요한 재료를 확인하세요</p>
        </div>
        
        <div className="card text-center hover:scale-105 transition-transform cursor-pointer">
          <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">조리 시간</h3>
          <p className="text-gray-600">전체 조리 시간을 미리 계산해보세요</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlan;
