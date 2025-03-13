import { useState, useEffect } from "react";
import { doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";
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

        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setTasks(userData.tasks || []); 
            }
        });

        return () => unsubscribe();
    }, []);

    const addTask = async (newTaskTitle: string) => {
        const user = auth.currentUser;
        if (!user) {
            console.error("User not authenticated");
            return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const newTask: Task = {
            id: crypto.randomUUID(), // Unique ID for the task
            title: newTaskTitle,
            completed: false,
        };

        try {
            await updateDoc(userDocRef, {
                tasks: arrayUnion(newTask), // Add task to the array
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    return { tasks, addTask };
};

export default useTasks;
