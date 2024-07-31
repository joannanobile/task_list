$(document).ready(function() {
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

    loadTasks();

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

    $('#task-list').on('click', 'li', function() {
        $(this).toggleClass('completed');
        saveTasks();
    });

    $('#btn-cancel').click(function() {
        $('#task-input').val('');
    });
});
