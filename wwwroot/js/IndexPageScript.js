//Search barı ve sayfalama scripti
document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 4;

    function paginate(items, containerId, paginationId) {
        const container = document.getElementById(containerId);
        const pagination = document.getElementById(paginationId);
        let filteredItems = items;

        function showPage(page) {
            container.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            filteredItems.slice(start, end).forEach(item => {
                item.classList.add('fade-out');
                container.appendChild(item);
            });

            setTimeout(() => {
                container.innerHTML = '';
                filteredItems.slice(start, end).forEach(item => {
                    item.classList.remove('fade-out');
                    item.classList.add('fade-in');
                    container.appendChild(item);

                    item.addEventListener('animationend', () => {
                        item.classList.remove('fade-in');
                    });
                });
            }, 100);
        }

        function createPagination() {
            pagination.innerHTML = '';
            const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
            for (let i = 1; i <= totalPages; i++) {
                const input = document.createElement('input');
                input.type = 'radio';
                input.className = 'btn-check';
                input.name = `${containerId}-pagination`;
                input.id = `${containerId}-page${i}`;
                input.autocomplete = 'off';
                if (i === 1) input.checked = true;

                const label = document.createElement('label');
                label.className = 'btn btn-outline-danger';
                label.htmlFor = input.id;
                label.textContent = i;

                input.addEventListener('click', () => showPage(i));

                pagination.appendChild(input);
                pagination.appendChild(label);
            }
        }

        function filterItems(searchValue) {
            filteredItems = items.filter(item => {
                const cardTitle = item.querySelector('.card-title').textContent.toLowerCase();
                const cardText = item.querySelector('.card-text').textContent.toLowerCase();
                return cardTitle.includes(searchValue) || cardText.includes(searchValue);
            });
            createPagination();
            showPage(1);
        }

        searchInput.addEventListener('input', function () {
            const searchValue = searchInput.value.toLowerCase();
            filterItems(searchValue);
        });

        createPagination();
        showPage(1);
    }

    const searchInput = document.getElementById('searchInput');

    const personelItems = Array.from(document.querySelectorAll('#personel-accounts .col'));
    const sharedItems = Array.from(document.querySelectorAll('#shared-accounts .col'));
    const managerItems = Array.from(document.querySelectorAll('#manager-accounts .col'));

    paginate(personelItems, 'personel-accounts', 'personel-pagination');
    paginate(sharedItems, 'shared-accounts', 'shared-pagination');
    paginate(managerItems, 'manager-accounts', 'manager-pagination');
});

//Search Bar iconuna tıklandığında focuslamasını sağlar.
function focusSearchInput() {
    document.getElementById("searchInput").focus();
}