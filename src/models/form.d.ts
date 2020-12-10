interface SaveFormProps {
  label?: string;
  btn?: string;
  fileName?: string;
}

interface SheetProps {
  name: string;
  data: string;
}

interface SaveFormFields {
  format: string;
  saveAll: boolean;
  sheets: SheetProps[];
  selectedSheetIdx: number;
}

type SaveFormData = (SaveFormProps & SaveFormFields);

export {
  SaveFormData,
  SaveFormProps,
  SheetProps
};
