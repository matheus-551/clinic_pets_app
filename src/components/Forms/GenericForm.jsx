import { useState, useEffect } from "react";
import FormField from "./FormField";
import Button from "../Buttons/Button";
import SubmitButton from "../Buttons/SubmitButton";

function GenericForm({ fields, initialValues, validateField, onSubmit }) {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    // Atualiza formulário caso initialValues mude (ex.: edição)
    useEffect(() => {
        setFormData(initialValues);
        setErrors({});
    }, [initialValues]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        const msg = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: msg }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};

        Object.keys(formData).forEach(field => {
            const msg = validateField(field, formData[field]);
            if (msg) newErrors[field] = msg;
        });

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) onSubmit(formData);
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow rounded-lg"
        >
            {fields.map(field => (
                <div key={field.name} className={field.full ? "md:col-span-2" : ""}>
                    <FormField
                        {...field}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors[field.name]}
                    />
                </div>
            ))}

            <div className="w-full md:col-span-2 flex justify-end mt-4 gap-2">
                <Button 
                    color="danger"
                    onClick={() => setFormData(initialValues)}
                >
                    Limpar Campos
                </Button>
                <SubmitButton color="success">
                    Registrar
                </SubmitButton>
            </div>
        </form>
    );
}

export default GenericForm;
