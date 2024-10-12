document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const routine = document.getElementById('routine');
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');

    let draggedElement = null;

    // Добавление слушателей событий для элементов
    elements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);

        // Обработчик кнопки информации
        const infoButton = element.querySelector('.info-button');
        infoButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const info = element.getAttribute('data-info');
            showModal(info);
        });
    });

    // Обработчики событий для конструктора рутины
    routine.addEventListener('dragover', dragOver);
    routine.addEventListener('drop', drop);
    routine.addEventListener('dragenter', dragEnter);
    routine.addEventListener('dragleave', dragLeave);

    // Функции drag and drop
    function dragStart(e) {
        draggedElement = this.cloneNode(true);
        draggedElement.classList.add('dragging');
        e.dataTransfer.setData('text/html', draggedElement.outerHTML);
    }

    function dragEnd() {
        draggedElement = null;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        routine.classList.add('drag-over');
    }

    function dragLeave() {
        routine.classList.remove('drag-over');
    }

    function drop(e) {
        e.preventDefault();
        routine.classList.remove('drag-over');
        const data = e.dataTransfer.getData('text/html');
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const newElement = doc.querySelector('.element');

        // Добавляем обработчики для нового элемента
        newElement.addEventListener('dragstart', dragStart);
        newElement.addEventListener('dragend', dragEnd);

        const infoButton = newElement.querySelector('.info-button');
        infoButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const info = newElement.getAttribute('data-info');
            showModal(info);
        });

        routine.appendChild(newElement);
        animateElements();
    }

    // Функция для отображения модального окна
    function showModal(text) {
        modalText.textContent = text;
        modal.style.display = 'block';
    }

    // Закрытие модального окна
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Анимация при добавлении элементов
    function animateElements() {
        const routineElements = routine.querySelectorAll('.element');
        routineElements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 0.1}s`;
            el.style.transform = 'scale(1)';
        });
    }

    // Инициализация
    animateElements();
});
