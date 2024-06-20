import FormSubmitButton from "@/components/form-submit-button";

interface PaginateButtonProps {
  children: React.ReactNode;
  value: number;
  action: (formData: FormData) => never;
}

const PaginateButton = ({ children, value, action }: PaginateButtonProps) => {
  return (
    <form className="flex w-full justify-end" action={action}>
      <input type="hidden" name="page" value={value} />
      <FormSubmitButton
        type="submit"
        className="mt-4 px-3 py-2 text-sm transition hover:scale-105"
      >
        {children}
      </FormSubmitButton>
    </form>
  );
};

export default PaginateButton;
