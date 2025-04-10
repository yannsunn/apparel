import React, { useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';

interface CustomizeOption {
  id: string;
  name: string;
  options: string[];
}

const customizeOptions: CustomizeOption[] = [
  {
    id: 'baseColor',
    name: 'ベースカラー',
    options: ['白', '黒', '赤', '青', '緑'],
  },
  {
    id: 'accentColor',
    name: 'アクセントカラー',
    options: ['白', '黒', '赤', '青', '緑'],
  },
  {
    id: 'number',
    name: '背番号',
    options: Array.from({ length: 99 }, (_, i) => (i + 1).toString()),
  },
  {
    id: 'size',
    name: 'サイズ',
    options: ['S', 'M', 'L', 'XL', 'XXL'],
  },
];

const CustomizePage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    baseColor: '白',
    accentColor: '黒',
    number: '10',
    size: 'M',
  });

  const handleOptionChange = (optionId: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ユニフォームカスタマイズ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* プレビューエリア */}
          <div className="bg-gray-100 p-8 rounded-lg">
            <div className="relative h-[500px] mb-4">
              <Image
                src="/images/uniform-template.png"
                alt="ユニフォームテンプレート"
                fill
                className="object-contain"
              />
              {/* カスタマイズされた要素をここに表示 */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-4xl font-bold text-black">
                  {selectedOptions.number}
                </span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">プレビュー</p>
              <p className="text-gray-600">
                カスタマイズしたユニフォームのプレビューを表示します
              </p>
            </div>
          </div>

          {/* カスタマイズオプション */}
          <div className="space-y-6">
            {customizeOptions.map((option) => (
              <div key={option.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">{option.name}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {option.options.map((value) => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.id, value)}
                      className={`p-2 rounded ${
                        selectedOptions[option.id] === value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* カートに追加ボタン */}
            <button className="w-full bg-accent text-white py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors">
              カートに追加
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomizePage; 