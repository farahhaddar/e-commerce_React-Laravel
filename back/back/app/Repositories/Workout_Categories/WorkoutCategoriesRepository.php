<?php
namespace App\Repositories\Workout_Categories;

use App\WorkoutCategories;

use App\Repositories\Interfaces\Workouts_Categories_Interface\WorkoutCatRepositoryInterface;
use App\Repositories\Workouts\WorkoutRepository;
use App\FileType\FileType;
use File;

class WorkoutCategoriesRepository extends WorkoutRepository implements WorkoutCatRepositoryInterface 
{

    public function getAll($rows)
    {
        if (isset($_GET['name'])) {
            return WorkoutCategories::with('workout')
            ->where('name', 'LIKE', '%' . $_GET['name'] . '%')
            ->paginate($rows);
        }


        return WorkoutCategories::with('workout')->paginate($rows);
    }
  

    public function count(){
        return WorkoutCategories::count(); 
    }


    public function getById($id)
    {
        return WorkoutCategories::with('workout')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $WorkoutCat = WorkoutCategories::find($id);
            if($WorkoutCat!=null)
                return $this->ADD_EDIT($WorkoutCat,$request);
            return null;
          
        } else {
            // create
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        
        $WorkoutCat=WorkoutCategories::with('workout')->where('id',$id);
        if($WorkoutCat->exists())
            {
                if (File::exists('storage/'.$WorkoutCat->first()->image)) 
                {
                FileType::destroy($WorkoutCat->first()->image);
                }

                foreach($WorkoutCat->first()->workout as $children)
                    $this->deleteWorkoutById($children->id);
                
                return $WorkoutCat->delete();
            }
    }

    //For createOrUpdate function
    private function ADD_EDIT($WorkoutCatUpdate,$request)
    {          // store($file, $folder)
        // update($file, $folder, $old_path)

        // if (File::exists($WorkoutCat->image))
        //     File::delete($WorkoutCat->image);
        if(is_null($WorkoutCatUpdate)){
        $WorkoutCat = new WorkoutCategories;

        if (File::exists('storage/'.$WorkoutCat->image))
            FileType::destroy($WorkoutCat->image);
        $WorkoutCat->image= FileType::store( $request->file('image'),'WorkoutCat');
        
        $WorkoutCat->name = $request->all()['name'];
      
        return $WorkoutCat->save();
        }
        else{
            error_log("aaz");
            if (File::exists('storage/'.$WorkoutCatUpdate->image))
            FileType::destroy($WorkoutCatUpdate->image);
            if($request->all()['image']!=""){
        $WorkoutCatUpdate->image= FileType::store( $request->file('image'),'WorkoutCat');
    }
        if($request->all()['name']!="")
        $WorkoutCatUpdate->name = $request->all()['name'];
      
        return $WorkoutCatUpdate->save();

        }
    }
    

}
