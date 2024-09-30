<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\inventory_categories;
use Illuminate\Http\Request;

class inventoryCategoriesController extends Controller
{
    // POST
    public function createCategory(Request $request)
    {
        $existCategory = inventory_categories::where('name', $request->name)->exists();

        if($existCategory)
        {
            return response()->json([
                'status' => 401,
                'message' => 'Category already exists.'
            ]);
        }

        $category = new inventory_categories();
        $category->name = $request->name;

        
        
        if($category->save())
        {
            $newCat = inventory_categories::where('name', $request->name)->first();

            return response()->json([
                'status' => 200,
                'message' => 'Success',
                'category' => $newCat
            ]);
        }
        else{
            return response()->json([
                'status' => 401,
                'message' => 'Something went wrong please try again later'
            ]);
        }
    }




    // GET
    public function getAllCategories()
    {
        return response()->json(inventory_categories::all());
    }
}
