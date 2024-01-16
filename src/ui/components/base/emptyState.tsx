import { CrumpledPaperIcon } from "@radix-ui/react-icons";

export const EmptyState = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <CrumpledPaperIcon width={300} height={300} />
      <h1 className="font-bold text-4xl text-center">Nothing Here</h1>
      <div className="text-lg text-center flex justify-center items-center flex-row">
        <p>Try creating an article using the button below</p>
      </div>
    </div>
  );
};
