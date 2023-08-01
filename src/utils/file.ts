export const MediaDuration = async (file: string): Promise<number> => {
  return new Promise<number>((resolve) => {
    const audio = new Audio(file);
    audio.addEventListener("loadedmetadata", () => {
      const audioDuration = Number(audio.duration.toFixed(1));
      resolve(audioDuration);
    });
  });
};
