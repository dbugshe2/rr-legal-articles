/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "..";
import { ArrowLeftIcon, ReloadIcon } from "@radix-ui/react-icons";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APP_USER_ID, ArticlesApi } from "app/service";
import { handleFormSubmission } from "ui/utils";
import { useSessionStorage } from "usehooks-ts";
import { IResultItem } from "types";

const createArtcleSchema = z.object({
  title: z.string().min(1, "kindly enter the article title").max(225, "article is too long"),
  body: z
    .object({
      content: z.string().min(1, "kindly enter some content"),
      author: z.string().min(1, "kindly enter the author name"),
    })
    .required(),
  userId: z.string(),
});

type CreateArticleFormType = z.infer<typeof createArtcleSchema>;

export const CreateArticle = () => {
  const navigate = useNavigate();
  const [allArticles, saveArticles] = useSessionStorage<IResultItem[] | []>(APP_USER_ID, []);

  const form = useForm<CreateArticleFormType>({
    resolver: zodResolver(createArtcleSchema),
    defaultValues: {
      userId: APP_USER_ID,
      title: "",
      body: {
        author: "",
        content: "",
      },
    },
  });

  const onSubmit = async (values: CreateArticleFormType) => {
    await handleFormSubmission({
      submitFn: ArticlesApi.createArticle,
      values: {
        data: { ...values },
        params: { userId: APP_USER_ID },
      },
      successMsg: "article saved succesfully",
      errorMsg: "creating article failed, kindly try again",
      onSuccess(data: IResultItem) {
        const newData = [...allArticles] as IResultItem[];
        newData.push(data);
        saveArticles(newData);
        navigate("/");
      },
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
              navigate("/");
            }}
          >
            <ArrowLeftIcon className="mr-2" />
            Go Back
          </Button>
        </div>
      </header>
      {/* header placeholder */}
      <div className="h-48" />
      <div className="flex relative flex-col justify-center gap-4 p-4">
        <div className="h-full flex flex-col gap-8">
          {/* create article form*/}
          <Form {...form}>
            <form
              onSubmit={e => {
                e.preventDefault();
                form.handleSubmit(onSubmit);
              }}
              action=""
              method="post"
            >
              <div className="flex flex-col md:flex-row min-h-96 max-h-full justify-between gap-8">
                <main className="flex flex-col gap-4 w-4/6">
                  <FormField
                    control={form.control}
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

                  <div>
                    <FormLabel>Content</FormLabel>
                    <Controller
                      name="body.content"
                      control={form.control}
                      rules={{ required: "kindly enter article content" }}
                      render={({ field }) => {
                        return (
                          <div>
                            <ReactQuill
                              theme="snow"
                              {...field}
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
                        );
                      }}
                    />
                    <FormDescription>Article content</FormDescription>
                    <FormMessage>{form.formState.errors?.body?.content?.message}</FormMessage>
                  </div>
                </main>
                <aside className="rounded-md h-full bg-secondary text-secondary-foreground p-8 w-2/6 gap-4 flex flex-col flex-wrap ">
                  <h4 className="text-xl">Extra Information</h4>
                  <hr />
                  <div>
                    {/* article author */}
                    <FormField
                      control={form.control}
                      name="body.author"
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
              <div className="flex justify-end items-center">
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  {form.formState.isSubmitting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
