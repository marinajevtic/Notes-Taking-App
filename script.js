document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const mainContainer = document.getElementById("main");
    const toggleThemeButton = document.getElementById("toggleTheme");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("categories");
    const totalNotesElement = document.getElementById("totalNotes");

    // Funkcija za promenu teme
    function toggleTheme() {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            toggleThemeButton.innerHTML = '<i class="fas fa-sun"></i> Light Theme';
        } else {
            toggleThemeButton.innerHTML = '<i class="fas fa-moon"></i> Dark Theme';
        }
    }

    // Funkcija za osvežavanje broja beleški
    function updateNoteStats() {
        const notes = mainContainer.querySelectorAll(".note");
        totalNotesElement.textContent = notes.length;
    }

    // Funkcija za kreiranje beleške
    function createNote(text = "", category = "all") {
        const note = document.createElement("div");
        note.classList.add("note");
        note.dataset.category = category;

        note.innerHTML = `
            <div class="tool">
                <span class="category">${category}</span>
                <i class="fas fa-trash delete"></i>
            </div>
            <textarea>${text}</textarea>
        `;

        // Dodavanje događaja za brisanje beleške
        const deleteBtn = note.querySelector(".delete");
        deleteBtn.addEventListener("click", () => {
            note.remove();
            updateNoteStats();
        });

        // Dodaj belešku u glavni kontejner
        mainContainer.appendChild(note);
        updateNoteStats();
    }

    // Dodavanje beleške klikom na dugme
    addBtn.addEventListener("click", () => {
        const category = categoryFilter.value !== "all" ? categoryFilter.value : "personal";
        createNote("", category);
    });

    // Promena teme klikom na dugme
    toggleThemeButton.addEventListener("click", toggleTheme);

    // Pretraga beleški
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const notes = mainContainer.querySelectorAll(".note");

        notes.forEach(note => {
            const text = note.querySelector("textarea").value.toLowerCase();
            if (text.includes(query)) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        });
    });

    // Filtriranje beleški po kategoriji
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const notes = mainContainer.querySelectorAll(".note");

        notes.forEach(note => {
            if (selectedCategory === "all" || note.dataset.category === selectedCategory) {
                note.style.display = "block";
            } else {
                note.style.display = "none";
            }
        });
    });

    // Inicijalno ažuriranje statistike
    updateNoteStats();
});