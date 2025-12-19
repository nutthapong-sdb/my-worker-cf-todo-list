const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stunning Todo List</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-blue: #0066ff;
            --primary-red: #ff3366;
            --bg-dark: #0a0e17;
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
            --text-main: #ffffff;
            --text-muted: #8b9bb4;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
        }

        body {
            background-color: var(--bg-dark);
            background-image: 
                radial-gradient(circle at 10% 20%, rgba(0, 102, 255, 0.2) 0%, transparent 40%),
                radial-gradient(circle at 90% 80%, rgba(255, 51, 102, 0.15) 0%, transparent 40%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--text-main);
            overflow-x: hidden;
        }

        /* Decorative background blobs */
        .blob {
            position: absolute;
            filter: blur(80px);
            z-index: -1;
            opacity: 0.6;
            animation: float 10s infinite ease-in-out;
        }
        .blob-1 {
            top: -10%;
            left: -10%;
            width: 500px;
            height: 500px;
            background: var(--primary-blue);
            animation-delay: 0s;
        }
        .blob-2 {
            bottom: -10%;
            right: -10%;
            width: 400px;
            height: 400px;
            background: var(--primary-red);
            animation-delay: -5s;
        }

        @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, 50px); }
        }

        .container {
            width: 100%;
            max-width: 500px;
            margin: 20px;
            padding: 2rem;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        header {
            margin-bottom: 2rem;
            text-align: center;
        }

        h1 {
            font-size: 2.5rem;
            font-weight: 600;
            background: linear-gradient(135deg, var(--primary-blue), #fff, var(--primary-red));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
            letter-spacing: -1px;
        }

        .input-group {
            position: relative;
            margin-bottom: 2rem;
            display: flex;
            gap: 10px;
        }

        input[type="text"] {
            width: 100%;
            padding: 1rem 1.25rem;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 16px;
            color: #fff;
            font-size: 1rem;
            outline: none;
            transition: all 0.3s ease;
        }

        input[type="text"]::placeholder {
            color: var(--text-muted);
        }

        input[type="text"]:focus {
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 4px rgba(0, 102, 255, 0.1);
            background: rgba(0, 0, 0, 0.4);
        }

        button.add-btn {
            padding: 0 1.5rem;
            border: none;
            border-radius: 16px;
            background: linear-gradient(135deg, var(--primary-blue), #0052cc);
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
        }

        button.add-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(0, 102, 255, 0.4);
        }

        .todo-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .todo-item {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 1rem;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: slideIn 0.3s ease-out forwards;
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .todo-item:hover {
            background: rgba(255, 255, 255, 0.08);
            transform: scale(1.01);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .todo-content {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
        }

        .custom-checkbox {
            width: 24px;
            height: 24px;
            border: 2px solid var(--text-muted);
            border-radius: 50%;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
        }

        .todo-item.completed .custom-checkbox {
            background: var(--primary-red);
            border-color: var(--primary-red);
        }

        .todo-item.completed .custom-checkbox::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: white;
        }

        .text {
            font-size: 1rem;
            color: var(--text-main);
            transition: all 0.2s;
        }

        .todo-item.completed .text {
            color: var(--text-muted);
            text-decoration: line-through;
        }

        .delete-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.2s;
            opacity: 0;
        }

        .todo-item:hover .delete-btn {
            opacity: 1;
        }

        .delete-btn:hover {
            color: var(--primary-red);
            background: rgba(255, 51, 102, 0.1);
        }

        .empty-state {
            text-align: center;
            padding: 3rem 0;
            color: var(--text-muted);
        }

    </style>
</head>
<body>
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="container">
        <header>
            <h1>Tasks</h1>
            <p style="color: var(--text-muted)">Stay organized, stay focused.</p>
        </header>

        <div class="input-group">
            <input type="text" id="todoInput" placeholder="Add a new task..." autocomplete="off">
            <button class="add-btn" id="addBtn">Add Task</button>
        </div>

        <ul class="todo-list" id="todoList">
            <!-- Items added here -->
        </ul>
        
        <div id="emptyState" class="empty-state">
            <p>No tasks yet. Add one above!</p>
        </div>
    </div>

    <script>
        const todoInput = document.getElementById('todoInput');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');

        async function fetchTodos() {
            try {
                const response = await fetch('/api/todos');
                const todos = await response.json();
                renderTodos(todos);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        }

        async function addTodo() {
            const text = todoInput.value.trim();
            if (!text) return;

            try {
                await fetch('/api/todos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                });
                todoInput.value = '';
                fetchTodos();
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }

        async function toggleTodo(id, completed) {
            try {
                await fetch(\`/api/todos/\${id}\`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !completed })
                });
                fetchTodos();
            } catch (error) {
                console.error('Error toggling todo:', error);
            }
        }

        async function deleteTodo(id) {
            try {
                await fetch(\`/api/todos/\${id}\`, { method: 'DELETE' });
                fetchTodos();
            } catch (error) {
                console.error('Error deleting todo:', error);
            }
        }

        function renderTodos(todos) {
            todoList.innerHTML = '';
            
            if (todos.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }

            todos.forEach(todo => {
                const li = document.createElement('li');
                li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
                
                li.innerHTML = \`
                    <div class="todo-content">
                        <div class="custom-checkbox" onclick="toggleTodo(\${todo.id}, \${todo.completed})"></div>
                        <span class="text">\${todo.text}</span>
                    </div>
                    <button class="delete-btn" onclick="deleteTodo(\${todo.id})">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                \`;
                
                todoList.appendChild(li);
            });
        }

        // Event Listeners
        addBtn.addEventListener('click', addTodo);
        
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        // Initial Load
        fetchTodos();
    </script>
</body>
</html>`;

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // Serve HTML
        if (request.method === 'GET' && path === '/') {
            return new Response(html, {
                headers: { 'content-type': 'text/html;charset=UTF-8' },
            });
        }

        // API Handler
        if (path.startsWith('/api/todos')) {
            // Check DB
            if (!env.DB) {
                return new Response(JSON.stringify({ error: 'DB binding not found' }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            // GET /api/todos
            if (request.method === 'GET') {
                const { results } = await env.DB.prepare(
                    "SELECT * FROM todos ORDER BY created_at DESC"
                ).all();
                return Response.json(results);
            }

            // POST /api/todos
            if (request.method === 'POST') {
                const { text } = await request.json();
                if (!text) return new Response('Missing text', { status: 400 });

                await env.DB.prepare(
                    "INSERT INTO todos (text, completed) VALUES (?, 0)"
                ).bind(text).run();

                return new Response('Created', { status: 201 });
            }

            // DELETE /api/todos/:id
            if (request.method === 'DELETE') {
                const id = path.split('/').pop();
                await env.DB.prepare(
                    "DELETE FROM todos WHERE id = ?"
                ).bind(id).run();
                return new Response('Deleted', { status: 200 });
            }

            // PATCH /api/todos/:id
            if (request.method === 'PATCH') {
                const id = path.split('/').pop();
                const { completed } = await request.json();
                await env.DB.prepare(
                    "UPDATE todos SET completed = ? WHERE id = ?"
                ).bind(completed ? 1 : 0, id).run();
                return new Response('Updated', { status: 200 });
            }
        }

        return new Response('Not Found', { status: 404 });
    },
};
