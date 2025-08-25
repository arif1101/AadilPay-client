/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUserMutation } from "@/redux/features/user/user.api";

type Props = {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
};

export default function UpdateAdminModal({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
    );
    try {
      await updateUser(filteredData).unwrap();
      setOpen(false);
      reset();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600">Update</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Admin Info</DialogTitle>
        </DialogHeader>

<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  <Tabs defaultValue="profile">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>

    <TabsContent value="profile" className="space-y-4 mt-4">
      <div>
        <Label>Name</Label>
        <Input {...register("name")} />
      </div>
      <div>
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
      </div>
      <div>
        <Label>Phone</Label>
        <Input {...register("phone")} />
      </div>
    </TabsContent>

    <TabsContent value="password" className="space-y-4 mt-4">
      <div>
        <Label>New Password</Label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Leave blank to keep same"
        />
      </div>
    </TabsContent>
  </Tabs>

  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
    {isLoading ? "Updating..." : "Save Changes"}
  </Button>
</form>

      </DialogContent>
    </Dialog>
  );
}
