$(document).ready(function() {
    // Função para carregar tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskElement = $(`<li>${task.text}</li>`);
            if (task.completed) {
                taskElement.addClass('completed');
            }
            $('#task-list').append(taskElement);
        });
    }

    // Função para salvar tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        $('#task-list li').each(function() {
            const task = {
                text: $(this).text(),
                completed: $(this).hasClass('completed')
            };
            tasks.push(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Carregar tarefas ao inicializar a página
    loadTasks();

    // Adicionar nova tarefa
    $('#task-form').submit(function(event) {
        event.preventDefault();
        const taskText = $('#task-input').val();
        if (taskText) {
            const taskElement = $(`<li>${taskText}</li>`);
            $('#task-list').append(taskElement);
            $('#task-input').val('');
            saveTasks();
        }
    });

    // Alternar tarefa concluída
    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed');
        saveTasks();
    });

    // Limpar campo de entrada ao clicar no botão Cancelar
    $('#btn-cancel').click(function() {
        $('#task-input').val('');
    });
});
