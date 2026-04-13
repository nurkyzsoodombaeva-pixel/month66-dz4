import { useFiltersStore } from "../../store/use-filters";
import { useCategories } from "../../hooks/use-categories";
import "./filters.css";

export function Filters() {
  const { search, setSearch, setCategoryId, resetFilters, categoryId } =
    useFiltersStore();

  const { data: categories } = useCategories();

  return (
    <div className="wrapper">
      <input
        type="text"
        placeholder="Введите..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="categories">
        {categories?.map((item) => (
          <button
            key={item.value}
            className={String(categoryId) === String(item.value) ? "active" : ""}
            onClick={() => setCategoryId(item.value)}
          >
            {item.label}
          </button>
        ))}

        <button onClick={resetFilters}>Очистить фильтры</button>
      </div>
    </div>
  );
}