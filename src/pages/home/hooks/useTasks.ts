import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config/firebase";
import { auth } from "../../../firebase/config/firebase";

interface Task {
    id: string;
    title: string;
    completed: boolean;
    date?: string; 
    subtasks?: number;
    category?: string;
}

const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const shiftedTasks = await checkAndShiftTasks(userData.tasks || [], userDocRef);
                setTasks(shiftedTasks); // Update state with shifted tasks
            }
        });

        return () => unsubscribe();
    }, []);

    const checkAndShiftTasks = async (tasks: Task[], userDocRef: any) => {
        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

        // Get last shift date
        const userDocSnap = await getDoc(userDocRef);
        const userData = userDocSnap.data() as { lastShiftDate?: string; tasks?: Task[] };
        const lastShiftDate = userData?.lastShiftDate;

        if (lastShiftDate === today) {
            return tasks; // Skip shifting if already done today
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];

        let updatedToday: Task[] = [];
        let updatedThisWeek: Task[] = [];

        tasks.forEach((task) => {
            if (task.date === today) {
                updatedThisWeek.push(task); // Move today’s tasks to 'This Week'
            } else if (task.date === tomorrowStr) {
                updatedToday.push({ ...task, date: today }); // Move tomorrow’s tasks to today
            } else {
                updatedThisWeek.push(task); // Keep all other tasks in 'This Week'
            }
        });

        const shiftedTasks = [...updatedToday, ...updatedThisWeek];

        // Update Firestore with shifted tasks
        try {
            await updateDoc(userDocRef, {
                tasks: shiftedTasks,
                lastShiftDate: today, // Store today's date to prevent multiple shifts
            });
        } catch (error) {
            console.error("Error shifting tasks:", error);
        }

        return shiftedTasks; // Return updated task list
    };

    const addTask = async (newTaskTitle: string, category: "today" | "tomorrow" | "week", selectedDate?: string) => {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const currentDate = new Date();
        let taskDate: string | undefined = undefined;

        if (category === "today") {
            taskDate = currentDate.toISOString().split("T")[0]; // Today's date
        } else if (category === "tomorrow") {
            const tomorrow = new Date(currentDate);
            tomorrow.setDate(currentDate.getDate() + 1);
            taskDate = tomorrow.toISOString().split("T")[0]; // Tomorrow's date
        } else if (category === "week" && selectedDate) {
            taskDate = selectedDate; // Use the user-selected date
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: newTaskTitle,
            completed: false,
            date: taskDate, // Assign the selected date
            category,
        };

        try {
            await updateDoc(userDocRef, {
                tasks: arrayUnion(newTask),
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };


    return { tasks, addTask };
};

export default useTasks;
