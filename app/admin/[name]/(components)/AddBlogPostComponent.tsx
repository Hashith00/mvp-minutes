"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const AddBlogPostComponent = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add your API call to save the blog post
    console.log("Form submitted:", formData);
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log("Response:", response);
      if (response.ok) {
        toast({
          title: "Blog post saved successfully",
          description: "Your blog post has been saved",
          variant: "default",
        });
        console.log("Blog post saved successfully");
      } else {
        toast({
          title: "Failed to save blog post",
          description: "Please try again",
          variant: "destructive",
        });
        console.error("Failed to save blog post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setFormData({
      title: "",
      content: "",
      author: "",
      image: "",
    });
    // Close the dialog
    setOpen(false);
    // alert("Form submitted" + formData.title);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add New Blog Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Blog Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlogPostComponent;
