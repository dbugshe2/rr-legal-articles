import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "..";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ArticlesApi } from "app/service";
import { handleFormSubmission } from "ui/utils";
const stringError = (title: string) => ({
  required_error: `${title} is required`,
});

const createArtcleSchema = z.object({
  author: z.string(stringError("Author")).min(1, "kindly enter the author name").nonempty("required field"),
  title: z.string(stringError("Title")).min(1, "kindly enter the article title").nonempty("required field"),
  userId: z.string().min(1, "").nonempty("required field"),
  publishedAt: z.string().min(1, "").nonempty("required field"),
  content: z.string(stringError("Content")).min(1, "kindly enter some content").nonempty("required field"),
});

type CreateArticlePayload = z.infer<typeof createArtcleSchema>;

export const CreateArticle = () => {
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const form = useForm<CreateArticlePayload>({
    resolver: zodResolver(createArtcleSchema),
    defaultValues: {
      author: "",
      title: "",
      userId: "",
      publishedAt: "",
      content: "",
    },
  });

  const onSubmit = async (values: CreateArticlePayload) => {
    await handleFormSubmission({
      submitFn: ArticlesApi.createArticle,
      values: {
        params: { ...values },
      },
      successMsg: "profile details saved succesfully",
      errorMsg: "saving profile details failed, kindly try again",
    });
  };

  return (
    <div className="flex flex-col relative">
      {/* page header */}
      <header className="fixed shadow-md px-8 shadow-accent z-50 bg-background h-48 gap-8 top-0 right-0 left-0 flex flex-col justify-center">
        {/* page title */}
        <h1 className="font-bold text-4xl text-center">
          RR Legal <span className="font-light">{" / "} Create Article</span>
        </h1>
        <div className="flex justify-between">
          {/* back button */}
          <Button
            variant={"secondary"}
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftIcon className="mr-2" />
            Go Back
          </Button>
        </div>
      </header>
      {/* header placeholder */}
      <div className="h-48" />
      <div className="flex relative flex-col justify-center gap-4 p-4 ">
        <div className="h-full">
          {/* create article form*/}
          <Form {...form}>
            <div className="flex flex-col md:flex-row min-h-96 justify-between gap-8">
              <main className="flex flex-col gap-4 w-4/6">
                <FormField
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Article Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <div>
                    <ReactQuill
                      className="h-full overflow-y-auto"
                      theme="snow"
                      value={content}
                      onBlur={() => {
                        form.setValue("content", content);
                      }}
                      onChange={e => {
                        setContent(e);
                      }}
                      modules={{
                        toolbar: [
                          [{ header: "1" }, { header: "2" }],
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image", "video"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              </main>
              <aside className="rounded-md h-full bg-secondary text-secondary-foreground p-8 w-2/6 gap-4 flex flex-col">
                <h4 className="text-xl">Extra Information</h4>
                <hr />
                <div>
                  {" "}
                  <FormField
                    name="author"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Maroof Shittu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </aside>
            </div>
            <Button
              type="submit"
              onClick={() => {
                form.handleSubmit(onSubmit);
              }}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
