import { useConfig } from "@mmrl/hooks";

function useFindExistingFile(filePaths) {
  const [config] = useConfig();
  return React.useMemo(() => {
    for (const filePath of filePaths) {
      const file = new SuFile(String(filePath));
      if (file.exist()) {
        return file;
      }
    }
    return null;
  }, [config]);
}

export { useFindExistingFile };
