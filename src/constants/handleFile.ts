export const handleFileType = (type: string) => {
  if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'docx';

  if (type === 'application/vnd.ms-excel') return 'xlsx';

  return type.split('/')[0];
};
