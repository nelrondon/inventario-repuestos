export const Input = ({ label, name, register, errors, ...props }) => {
  return (
    <>
      <label>
        <span>{label}:</span>
        <input
          {...props}
          {...register(name, { required: true })}
          className={errors[name] ? "input-required" : ""}
          name={name}
          autoComplete="off"
        />
        {errors[name] && (
          <span className="data-required">Completa este campo</span>
        )}
      </label>
    </>
  );
};

export const InputBasic = ({ label, name, ...props }) => {
  return (
    <>
      <label>
        <span>{label}:</span>
        <input {...props} name={name} autoComplete="false" />
      </label>
    </>
  );
};
