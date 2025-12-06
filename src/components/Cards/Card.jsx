import { UserIcon } from '@phosphor-icons/react';
import Button from '../Buttons/Button';
import Badge from '../Badge/Badge';

function Card({
  icon: Icon = UserIcon,
  title,
  fields = [],
  status,
  actions = [],
}) {
  return (
    <div className="w-full flex flex-col lg:flex-row border border-gray-200 rounded-xl shadow-sm p-5 gap-6 mb-4">
      {/* --- COLUNA DO ÍCONE E TÍTULO --- */}
      <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
        {Icon && <Icon color="#000" size="80" />}
        <span className="text-lg font-bold text-black text-center">
          {title}
        </span>
      </div>

      {/* --- COLUNA PRINCIPAL (DEVE SER A MAIOR) --- */}
      <div className="w-full lg:flex-1 flex justify-center">
        <div
          className="
            w-full
            grid
            grid-cols-1
            grid-rows-3
            lg:auto-cols-fr
            lg:grid-flow-col
            gap-2
            px-4
          "
        >
          {fields.map(({ label, value, id }, index) => (
            <div key={index} className="flex flex-col p-3">
              <label htmlFor={id} className="text-md font-semibold text-black">
                {label}
              </label>
              <span id={id} className="text-md text-gray-600">
                {value}
              </span>
            </div>
          ))}

          {status && (
            <div className="flex flex-col p-3">
              <label className="text-md font-semibold text-black">
                Status:
              </label>
              <Badge
                text={
                  status.status
                }
                type={(status.status == 'AGENDADA' ? 'active' : (status.status == 'CANCELADA' ? 'inactive' : 'pedding'))}
                textSize="md"
                size="md"
              />
            </div>
          )}
        </div>
      </div>

      {/* --- COLUNA DAS AÇÕES --- */}
      <div className="w-full lg:w-1/4 flex flex-col items-center justify-center">
        <div className="w-full flex flex-row lg:flex-col items-center justify-center gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              color={action.color}
              className="w-full flex items-center justify-center"
              onClick={action.onClick}
            >
              {action.icon && (
                <action.icon size="20" color="#fff" className="mr-2" />
              )}
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
