function FormField({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    type = "text",
    placeholder,
    options = [] // <-- ADICIONADO
}) {
    const baseClass = `border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
        ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}`;

    return (
        <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">{label}</label>

            {type === "select" ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={baseClass}
                >
                    <option value="">Selecione uma opcão...</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={baseClass}
                />
            )}

            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

export default FormField;
