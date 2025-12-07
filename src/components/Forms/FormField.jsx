function FormField({ label, name, value, onChange, onBlur, error, type = "text", placeholder }) {
    return (
        <div className="flex flex-col">
            <label className="font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2
                    ${error ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"}`}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
    );
}

export default FormField;
