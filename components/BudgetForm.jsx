// "use client";

// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// const categories = ["Food", "Rent", "Transport", "Shopping", "Utilities", "Other"];

// export default function BudgetForm({ onSubmit }) {
//   const { register, handleSubmit, setValue, watch, reset } = useForm({
//     defaultValues: {
//       category: "Other",
//       amount: "",
//       month: new Date().toISOString().slice(0, 7),
//     },
//   });

//   const submit = (data) => {
//     data.amount = parseFloat(data.amount);
//     onSubmit(data);
//     reset();
//   };

//   return (
//     <Card className="p-4">
//       <CardContent>
//         <form onSubmit={handleSubmit(submit)} className="grid gap-4">
//           <div>
//             <label className="text-sm font-medium">Category</label>
//             <Select
//               onValueChange={(val) => setValue("category", val)}
//               defaultValue={watch("category")}
//             >
//               <SelectTrigger>
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat} value={cat}>
//                     {cat}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <label className="text-sm font-medium">Amount</label>
//             <Input type="number" step="0.01" {...register("amount")} />
//           </div>

//           <div>
//             <label className="text-sm font-medium">Month</label>
//             <Input type="month" {...register("month")} />
//           </div>

//           <Button type="submit">Add Budget</Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const categories = ["Food", "Rent", "Transport", "Shopping", "Utilities", "Other"];

export default function BudgetForm({ onSubmit, defaultValues = null, mode = "create" }) {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: defaultValues || {
      category: "Other",
      amount: "",
      month: new Date().toISOString().slice(0, 7),
    },
  });

  const submit = (data) => {
    data.amount = parseFloat(data.amount);
    onSubmit(data);
    reset();
  };

  return (
    <Card className="p-4">
      <CardContent>
        <form onSubmit={handleSubmit(submit)} className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Category</label>
            <Select
              onValueChange={(val) => setValue("category", val)}
              defaultValue={watch("category")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input type="number" step="0.01" {...register("amount")} />
          </div>

          <div>
            <label className="text-sm font-medium">Month</label>
            <Input type="month" {...register("month")} />
          </div>

          <Button type="submit">
            {mode === "edit" ? "Update Budget" : "Add Budget"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
