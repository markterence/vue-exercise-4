export default function validateForm(rules = [], input = "") {
  const findInvalid = fn => fn(input) !== true;
  const invalid = rules.find(findInvalid);
  const passed = !invalid;
  return {
    state: passed || invalid(input) === true,
    error: passed || invalid(input) === true ? null : invalid(input)
  };
}
