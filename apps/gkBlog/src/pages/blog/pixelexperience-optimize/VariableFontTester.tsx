/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";

// eslint-disable-next-line react/function-component-definition
const VariableFontTester: React.FC = () => {
  const [weight, setWeight] = useState(506);
  const [fontSize, setFontSize] = useState(36);
  const [text, setText] = useState("永 A 6");

  return (
    <div className="mx-auto mt-3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-200">
      <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">
        可变字体测试器
      </h2>
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              字重: {weight}
            </label>
            <input
              type="range"
              id="weight"
              min="1"
              max="999"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 ${
                  weight / 9.99
                }%, #E5E7EB ${
                  weight / 9.99
                }%) dark:linear-gradient(to right, #60A5FA ${
                  weight / 9.99
                }%, #4B5563 ${weight / 9.99}%)`,
              }}
            />
          </div>
          <div>
            <label
              htmlFor="fontSize"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              字号: {fontSize}px
            </label>
            <input
              type="range"
              id="fontSize"
              min="20"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 ${
                  (fontSize - 20) / 0.8
                }%, #E5E7EB ${
                  (fontSize - 20) / 0.8
                }%) dark:linear-gradient(to right, #60A5FA ${
                  (fontSize - 20) / 0.8
                }%, #4B5563 ${(fontSize - 20) / 0.8}%)`,
              }}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="text"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            文本:
          </label>
          <input
            type="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入测试文本..."
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          预览:
        </h3>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p
            style={{
              fontWeight: weight,
              fontSize: `${fontSize}px`,
            }}
            className="break-words whitespace-pre-wrap text-gray-900 dark:text-gray-100"
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VariableFontTester;
