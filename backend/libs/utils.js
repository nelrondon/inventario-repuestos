export function getErrorsZod(result) {
  const errors = JSON.parse(result.error);
  return errors.map((error) => error.message);
}
