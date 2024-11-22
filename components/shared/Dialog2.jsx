import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "@/lib/ZodSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";

export function ProfileForm({ recordMoves, setDrenchInfo, setIsOpen2 }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leastMovesTakenBy: "",
    },
  });

  async function onSubmit(values) {
    try {
      const payload = {
        leastMovesTakenBy: values.leastMovesTakenBy,
        leastMovesTaken: recordMoves,
      };
      const response = await axios.post(
        `${BASE_URL}/api/v1/editDrenchInfo`,
        payload
      );
      setIsOpen2(false);
      setDrenchInfo(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="leastMovesTakenBy"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const Dialog2 = ({ isOpen2, setIsOpen2, recordMoves, setDrenchInfo }) => {
  return (
    <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
      <DialogContent className="max-sm:w-[95%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">The Drench Game</DialogTitle>
          <DialogDescription className="text-black text-md max-sm:text-md">
            <p>{`🎉 Congratulations,\n\nYou've set a new record by completing the
            game in just ${
              recordMoves === undefined ? "-" : recordMoves
            } moves! You've outperformed all
            previous players. Keep up the amazing work! 🏆🎮`}</p>
          </DialogDescription>
        </DialogHeader>
        <ProfileForm
          recordMoves={recordMoves}
          setDrenchInfo={setDrenchInfo}
          setIsOpen2={setIsOpen2}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Dialog2;
