import React from 'react'
import { Link } from 'react-router-dom'

export default function Database() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-indigo-300">MySQL Database Operations</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-indigo-300 mb-4">📊 Full CRUD Demonstration</h2>
        <p className="text-gray-300 mb-6">
          This application demonstrates all fundamental database operations on MySQL with proper relationships and authentication.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* USERS */}
          <Link to="/users" className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition border border-gray-700 cursor-pointer">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2">Users</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ <span className="text-green-400">CREATE</span> - Signup new users</li>
              <li>✅ <span className="text-blue-400">READ</span> - View all users</li>
              <li>✅ <span className="text-purple-400">UPDATE</span> - Edit user info</li>
              <li>✅ <span className="text-red-400">DELETE</span> - Remove users</li>
            </ul>
            <div className="mt-4 text-xs text-gray-400">
              Table: <code className="bg-gray-800 px-2 py-1 rounded">users</code>
            </div>
          </Link>

          {/* ORDERS */}
          <Link to="/orders" className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition border border-gray-700 cursor-pointer">
            <div className="text-3xl mb-3">📦</div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2">Orders</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ <span className="text-green-400">CREATE</span> - New orders</li>
              <li>✅ <span className="text-blue-400">READ</span> - View orders</li>
              <li>✅ <span className="text-purple-400">UPDATE</span> - Edit orders</li>
              <li>✅ <span className="text-red-400">DELETE</span> - Remove orders</li>
            </ul>
            <div className="mt-4 text-xs text-gray-400">
              FK: <code className="bg-gray-800 px-2 py-1 rounded">user_id</code>
            </div>
          </Link>

          {/* ANSWERS */}
          <Link to="/answers" className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition border border-gray-700 cursor-pointer">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2">Answers</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>✅ <span className="text-green-400">CREATE</span> - Submit answers</li>
              <li>✅ <span className="text-blue-400">READ</span> - View answers</li>
              <li>✅ <span className="text-purple-400">UPDATE</span> - Edit answers</li>
              <li>✅ <span className="text-red-400">DELETE</span> - Remove answers</li>
            </ul>
            <div className="mt-4 text-xs text-gray-400">
              FK: <code className="bg-gray-800 px-2 py-1 rounded">user_id</code>
            </div>
          </Link>
        </div>
      </div>

      {/* Database Schema */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-indigo-300 mb-4">🗄️ Database Schema</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <h4 className="font-bold text-green-300 mb-2">users</h4>
            <code className="text-xs text-gray-300 block space-y-1">
              <div>id INT PRIMARY KEY</div>
              <div>email VARCHAR(255) UNIQUE</div>
              <div>password_hash VARCHAR(255)</div>
              <div>name VARCHAR(200)</div>
              <div>created_at TIMESTAMP</div>
            </code>
          </div>

          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <h4 className="font-bold text-green-300 mb-2">orders</h4>
            <code className="text-xs text-gray-300 block space-y-1">
              <div>id INT PRIMARY KEY</div>
              <div>user_id INT FK</div>
              <div>title VARCHAR(255)</div>
              <div>details TEXT</div>
              <div>created_at TIMESTAMP</div>
            </code>
          </div>

          <div className="bg-gray-900 p-4 rounded border border-gray-700">
            <h4 className="font-bold text-green-300 mb-2">answers</h4>
            <code className="text-xs text-gray-300 block space-y-1">
              <div>id INT PRIMARY KEY</div>
              <div>user_id INT FK</div>
              <div>question VARCHAR(255)</div>
              <div>answer TEXT</div>
              <div>created_at TIMESTAMP</div>
            </code>
          </div>
        </div>
      </div>

      {/* Operations Guide */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-indigo-300 mb-4">📝 How to Demonstrate to Professor</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-2xl">1️⃣</div>
            <div>
              <h4 className="font-bold text-green-400">CREATE (INSERT)</h4>
              <p className="text-gray-300 text-sm">Sign up → New Order → New Answer. Watch data appear in tables.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">2️⃣</div>
            <div>
              <h4 className="font-bold text-blue-400">READ (SELECT)</h4>
              <p className="text-gray-300 text-sm">View Users, Orders, Answers pages. All data from MySQL displayed.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">3️⃣</div>
            <div>
              <h4 className="font-bold text-purple-400">UPDATE (EDIT)</h4>
              <p className="text-gray-300 text-sm">Click "Edit" button → Modify → Save. Changes update in MySQL.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-2xl">4️⃣</div>
            <div>
              <h4 className="font-bold text-red-400">DELETE (REMOVE)</h4>
              <p className="text-gray-300 text-sm">Click "Delete" button → Confirm → Data removed from MySQL.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-indigo-300 mb-4">⭐ Key Features</h3>
        <ul className="space-y-2 text-gray-300">
          <li>✅ <span className="font-semibold">Authentication</span> - JWT-based login/signup</li>
          <li>✅ <span className="font-semibold">Foreign Key Relationships</span> - Orders & Answers linked to Users</li>
          <li>✅ <span className="font-semibold">Validation & Error Handling</span> - Proper form validation</li>
          <li>✅ <span className="font-semibold">Data Persistence</span> - All data stored in MySQL</li>
          <li>✅ <span className="font-semibold">Backend Routes</span> - All CRUD endpoints implemented</li>
          <li>✅ <span className="font-semibold">Frontend UI</span> - Beautiful tables with edit/delete buttons</li>
        </ul>
      </div>
    </div>
  )
}
